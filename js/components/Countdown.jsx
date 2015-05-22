var Countdown = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function() {
        /*
        https://jsfiddle.net/s27nz1hb/

        var dates = [];

        for (var i = 0; i < allEvents.length; i++) {
            dates.push(allEvents[i].date
            );
        }

        dates.sort(function(a, b){
            var aa = a.split('-').join(''),
                bb = b.split('-').join('');

            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });

        console.log(dates);
        */

        return {events: [], text: ''};
    },

    componentWillMount: function() {
        var firebaseRef = new Firebase("//until.firebaseio.com/events");

        this.setState({ ref: firebaseRef }); 
        this.bindAsArray(firebaseRef, 'events');
    },

    componentDidMount: function() {
        // TODO: Refactor this nasty hackery
        setTimeout(function() {
            var flkty = new Flickity('.js-gallery', {prevNextButtons: false})

            console.log('comp did mount')
        }, 1000);
    },

    componentDidUpdate: function() {
        // TODO: Refactor this nasty hackery
        setTimeout(function() {
            //flkty.reloadCells();
            console.log('comp did update')
        }, 2000);
    },

    onChange: function(e) {
        this.setState({text: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.firebaseRefs['events'].push({
                text: this.state.text
            }); 
            this.setState({text: ''});
        }   
    },

    handleClick: function(key) {
        var firebaseRef = this.state.ref;
        firebaseRef.child(key).remove();
    },

    render: function() {
        var that = this;
        console.log('countdown render called, this.state.events = ', this.state.events);

        return(
            <div className="gallery height-inherit js-gallery">
                {this.state.events.map(function(event, index) {
                    return(
                        <Card name={event.name} date={event.date} count={index} onClick={this.handleClick}/>
                    )
                }, this)}
                <EventForm/>
            </div>
        )
    }
});
