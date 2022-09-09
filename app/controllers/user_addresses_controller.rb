class UserAddressesController < ApplicationController

    def update 
        user = find_user
        user.user_address.update!(user_address_params)
        render json: user, status: :ok
    end

    def create
        user = find_user
        UserAddress.create!({
            user_id: params[:user_id],
            street: params[:street],
            city: params[:city],
            state: params[:state],
            zip: params[:zip]
        })
        render json: user, status: :ok
    end

    private

    def user_address_params
        params.permit(:street, :city, :state, :zip)
    end
end
