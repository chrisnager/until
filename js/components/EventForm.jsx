var EventForm = React.createClass({
    addEvent: function() {
        var myEvents = new Firebase('//until.firebaseio.com/events'),
            name = document.querySelector('#eventName').value,
            date = document.querySelector('#eventDate').value;

        console.log(name, date);

        if (name !== '' && date !== '') {
            myEvents.push(this.props);
        }
    },

    updateName: function(e) {
        var name = e.target.value;

        if (name !== '') {
            this.props.name = name;
            e.target.classList.remove('is-error');
        } else {
            e.target.classList.add('is-error');
        }

        console.log(this.props.name);
    },

    updateDate: function(e) {
        var date = e.target.value;

        if (date !== '') {
            this.props.date = date;
            e.target.classList.remove('is-error');
        } else {
            e.target.classList.add('is-error');
        }

        console.log(this.props.date);
    },

    render: function() {
        var styles = {
            galleryCellAlternate: 'border-box full-width height-inherit p3 aqua bg-navy',
            galleryCellInner: 'max-width-25 mx-auto'
        }

        return(
            <div className={styles.galleryCellAlternate} id="new-event">
                <div className={styles.galleryCellInner}>
                    <h1 className="caps font-family-inherit">New event</h1>
                    <div>
                        <label for="eventName">Name of event:</label>
                        <input className="block full-width mb1 field-light black" type="text" id="eventName" placeholder="Disney World" onChange={this.updateName}/>
                    </div>
                    <div>
                        <label for="eventDate">Start date of event:</label>
                        <input className="block full-width mb2 field-light black" type="date" id="eventDate" placeholder="2015-03-13" onChange={this.updateDate}/>
                    </div>
                    <button className="button black bg-aqua" type="submit" onClick={this.addEvent}>Add event</button>
                </div>
            </div>
        );
    }
});
