class WatchListsController < ApplicationController

    def create
        user = User.find_by(id: session[:user_id])
        watch_list = user.watch_lists.create!({toy_id: params[:toy_id]})
        render json: watch_list, status: :ok
    end
end
