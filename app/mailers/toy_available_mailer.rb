class ToyAvailableMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        @url = "http://toy_library.com/"
        mail(to: @user.email, subject: "Welcome to the Toy Library")
    end 
end
