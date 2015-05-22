var UntilList = React.createClass({
    handleClick: function(key) {
        if (this.props.onClick) {
            this.props.onClick(key);
        }
    },

    render: function() {
        var list = this;
        var styles = {
            galleryCell: 'border-box full-width border-bottom p3 black bg-aqua',
            galleryCellInner: 'max-width-25 mx-auto'
        }
        var createItem = function(item, index) {
            var boundClick = list.handleClick.bind(list, item['$id']);

            return (
                <div className={styles.galleryCell} id={'gallery-cell-' + item['$id']} key={ item['$id'] }>
                    <div className={styles.galleryCellInner}>
                        <h1 className='caps font-family-inherit'>{item.name}</h1>
                        <p>{moment(item.date).fromNow()}</p>
                        <button className='button bg-red' onClick={boundClick}>Remove event</button>
                    </div>
                </div>
            )
        };

        return <div>{this.props.items.map(createItem)}</div>;
    }
});

var UntilApp = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function() {
        return {
            items: []
            //name: '',
            //date: ''
        };
    },

    componentWillMount: function() {
        var firebaseRef = new Firebase('//until.firebaseio.com/events');

        this.setState({
            ref: firebaseRef
        });
        this.bindAsArray(firebaseRef, 'items');
    },

    componentDidMount: function() {
        //var flkty = new Flickity('.js-gallery', {prevNextButtons: false})
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

        return (
          <div className="gallery height-inherit js-gallery">
                <UntilList items={ this.state.items } onClick={this.handleClick} />
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

React.render(<UntilApp/>, document.body);
