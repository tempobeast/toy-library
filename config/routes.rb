Rails.application.routes.draw do
  # namespace :api do
    resources :user_addresses, only: [:update, :create]
    resources :cart_items, only: [:create]
    resources :shopping_sessions, only: [:create, :index, :update]
    delete '/cancel_shopping_session/:id', to: 'shopping_sessions#cancel'
    patch '/change_user_admin_status/:id', to: 'users#user_admin_status'


    resources :watch_lists, only: [:create, :destroy]
    resources :toys
    resources :users


    get '/me', to: 'users#show'
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  # end

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
