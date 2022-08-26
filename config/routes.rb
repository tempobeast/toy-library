Rails.application.routes.draw do
  resources :user_addresses
  resources :cart_items
  resources :shopping_sessions
  resources :user_payment_methods
  resources :reported_problems
  resources :watch_lists
  resources :toys
  resources :users

  get '/me', to: 'user#show'
  post '/signup', to: 'user#create'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
