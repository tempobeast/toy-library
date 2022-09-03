class WatchListsController < ApplicationController

    def create
        user = User.find_by(id: session[:user_id])
        user.watch_lists.create!({toy_id: params[:toy_id]})
        render json: user, status: :ok
    end

    def destroy
        user = find_user
        watch_to_remove = user.watch_lists.find(params[:id])
        watch_to_remove.destroy
        render json: user, status: :ok
    end
end
