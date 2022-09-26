class OrderDetailsMailer < ApplicationMailer

    def details
        @user = params[:user]
        @user_address = "#{@user.user_address.street}, #{@user.user_address.city}, #{@user.user_address.state} #{@user.user_address.zip}"
        @order = params[:order]
        if @total_items == 1
            @total_items = "1 item"
        else
            @total_items = "#{@order.cart_items.length} items"
        end
        @url = "http://toy_library.com/user_login"
        mail(to: @user.email, subject: "Your Toy Order is Processing")
    end
end
