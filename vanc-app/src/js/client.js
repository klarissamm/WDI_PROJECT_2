const App = App || {};

App.init = function() {
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  this.$main.on('submit', 'form', this.handleForm);

};

App.register = function(e){
  if(e) e.preventDefault();
  console.log('You clicked register');
};

App.handleForm = function(e) {
  if (e) e.preventDefault();
  console.log('Form submitted');
};

$(App.init.bind(App));
