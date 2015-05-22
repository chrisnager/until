var Card = React.createClass({
    //removeEvent: function(e) {
        //this.bindAsArray(new Firebase('//until.firebaseio.com/events'), 'events');
        //allEvents = this.firebaseRefs['events'];
        //console.log(allEvents, this.props);

        //var firebaseRef = new Firebase('//until.firebaseio.com/events');

        //allEvents.splice(count, 1);
        //console.log(allEvents);
        //allEvents.push(allEvents);

        //firebaseRef.on('value', function(snapshot) {
            //var myEvents = snapshot.val(),
                //key = Object.keys(myEvents)[this.props.count];

            //function onComplete(error) {
                //error ? console.log('sync failed') : console.log('sync succeeded');
            //}

            //console.log(key);
            //firebaseRef.remove(onComplete);
            //firebaseRef.set(myEvents);
        //});
    //},

    render: function() {
        var styles = {
            galleryCell: 'border-box full-width height-inherit border-bottom p3 black bg-aqua',
            galleryCellInner: 'max-width-25 mx-auto'
        }

        return(
            <div className={styles.galleryCell} id={'gallery-cell-' + this.props.count}>
                <div className={styles.galleryCellInner}>
                    <h1 className="caps font-family-inherit">{this.props.name}</h1>
                    <p>{moment(this.props.date, "YYYYMMDD").fromNow()}</p>
                    <button className="button bg-red" onClick={this.removeEvent}>Remove event</button>
                </div>
            </div>
        );
    }
});
