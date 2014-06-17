if (Meteor.isClient) {
  var Greetings = new Meteor.Collection(null);
  Greetings.insert({text: 'initial text'});
  
  Router.route('hello', {
    path: '/',
    data: function () {
      return Greetings.findOne();
    }
  });

  Template.hello.events({
    'click input[type=button]': function() {
      this.text = $('input[type=text]').val();
      
      Greetings.update(this._id, {$set: {text: this.text}});
    }
  });
  
  Deps.autorun(function() {
    console.log("The greeting is:", Greetings.findOne().text);
  });
}