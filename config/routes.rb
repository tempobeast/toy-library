Rails.application.routes.draw do
  resources :order_items
  resources :orders
  # resources :user_addresses
  resources :cart_items, only: [:create]
  resources :shopping_sessions, only: [:create, :show]
  # resources :user_payment_methods
  # resources :reported_problems
  resources :watch_lists, only: [:create, :destroy]
  resources :toys, only: [:index, :create]
  resources :users

  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
