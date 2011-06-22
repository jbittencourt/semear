ActionController::Routing::Routes.draw do |map|
 
  map.devise_for :users

  map.root :controller => "dashboard"
  
  map.resources :maps, :member => { :find_seed => :post, :save => :post }
 
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
