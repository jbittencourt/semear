ActionController::Routing::Routes.draw do |map|
 
  map.devise_for :users

  map.root :controller => "dashboard"
  
  map.resource :map
 
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
