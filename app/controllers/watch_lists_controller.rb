class WatchListsController < ApplicationController

    def create
        user = User.find_by(id: session[:user_id])
        user.watch_lists.create!({toy_id: params[:toy_id]})
        render json: user, status: :ok
    end
end
