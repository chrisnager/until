var List = React.createClass({
    handleClick: function(key) {
        if (this.props.onClick) {
            this.props.onClick(key)
        }
    },

    formatDays: function(date) {
        var days = moment(date).diff(moment(), 'days')

        if (days === 0 && moment(date).days() === moment().days()) {
            return 'Today!'
        }
 
        if (days === -1) {
            return days.toString().replace(/-/g,'') + ' day since'
        }

        if (days < 0) {
            return days.toString().replace(/-/g,'') + ' days since'
        }

        if (days === 0) {
            return days + 1 + ' day until'
        }

        return days + 1 + ' days until'
    },

    sortByDate: function(a, b) {
        if (a.date < b.date) {
            return -1
        }

        if (a.date > b.date) {
            return 1
        }

        return 0;
    },

    render: function() {
        var that = this

        var styles = {
            galleryCell: 'border-box full-width border-bottom p3 black bg-aqua',
            galleryCellInner: 'max-width-25 mx-auto'
        }

        var createItem = function(item, index) {
            var boundClick = that.handleClick.bind(that, item['$id'])

            return(
                <div className={styles.galleryCell} id={'gallery-cell-' + item['$id']} key={ item['$id'] }>
                    <div className={styles.galleryCellInner}>
                        <p>{that.formatDays(item.date)}</p>
                        <h1 className='caps font-family-inherit'>{item.name}</h1>
                        <button className='button bg-red' onClick={boundClick}>Remove event</button>
                    </div>
                </div>
            )
        }

        this.props.items.sort(this.sortByDate)

        return <div>{this.props.items.map(createItem)}</div>
    }
})

var Form = React.createClass({
    render: function() {
        var styles = {
            galleryCellAlternate: 'border-box full-width height-inherit p3 aqua bg-navy',
            galleryCellInner: 'max-width-25 mx-auto'
        }

        return(
            <form onSubmit={this.handleSubmit} className={'gallery-cell ' + styles.galleryCellAlternate} id="new-event">
                <div className={styles.galleryCellInner}>
                    <h1 className="caps font-family-inherit">New event</h1>
                    <div>
                        <label for="eventName">Name of event:</label>
                        <input onChange={this.onNameChange} value={this.state.name} className="block full-width mb1 field-light black" type="text" id="eventName" placeholder="Disney World"/>
                    </div>
                    <div>
                        <label for="eventDate">Start date of event:</label>
                        <input onChange={this.onDateChange} value={this.state.date} className="block full-width mb2 field-light black" type="date" id="eventDate" placeholder="2015-03-13"/>
                    </div>
                    <button className="button black bg-aqua" type="submit" onClick={this.addEvent}>Add event</button>
                </div>
            </form>
        )
    }
});

var App = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function() {
        return {items: []};
    },

    componentWillMount: function() {
        var firebaseRef = new Firebase('//until.firebaseio.com/events');

        this.setState({ref: firebaseRef});
        this.bindAsArray(firebaseRef, 'items');
    },

    onNameChange: function(e) {
        this.setState({
            name: e.target.value
        });
    },

    onDateChange: function(e) {
        this.setState({
            date: e.target.value
        });
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (this.state.name && this.state.name.trim().length !== 0) {
            this.firebaseRefs['items'].push({name: this.state.name, date: this.state.date});
        }
    },

    handleClick: function(key) {
        var firebaseRef = this.state.ref;
        firebaseRef.child(key).remove();
    },

    render: function() {
        var styles = {
            galleryCellAlternate: 'border-box full-width height-inherit p3 aqua bg-navy',
            galleryCellInner: 'max-width-25 mx-auto'
        }

        return(
            <div className="gallery height-inherit js-gallery">
                <List items={ this.state.items } onClick={this.handleClick} />
                <form onSubmit={this.handleSubmit} className={'gallery-cell ' + styles.galleryCellAlternate} id="new-event">
                    <div className={styles.galleryCellInner}>
                        <h1 className="caps font-family-inherit">New event</h1>
                        <div>
                            <label for="eventName">Name of event:</label>
                            <input onChange={this.onNameChange} value={this.state.name} className="block full-width mb1 field-light black" type="text" id="eventName" placeholder="Disney World"/>
                        </div>
                        <div>
                            <label for="eventDate">Start date of event:</label>
                            <input onChange={this.onDateChange} value={this.state.date} className="block full-width mb2 field-light black" type="date" id="eventDate" placeholder="2015-03-13"/>
                        </div>
                        <button className="button black bg-aqua" type="submit" onClick={this.addEvent}>Add event</button>
                    </div>
                </form>
            </div>
        );
    }
});

React.render(<App/>, document.body);
