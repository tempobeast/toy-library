class NewUserMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        @url = "http://toy_library.com/user_login"
        mail(to: @user.email, subject: "Welcome to the Toy Library")
    end 
end
