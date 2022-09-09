class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true, on: :create
    validates :password, presence: true, :length => { minimum: 8, maximum: 16}, on: :create
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP}
    validates :first_name, presence: true, format: { with: /\A[^0-9`!@#\$%\^&*+_=]+\z/, message: "only allows letters" }
    validates :last_name, presence: true, format: { with: /\A[^0-9`!@#\$%\^&*+_=]+\z/, message: "only allows letters" }

    validates :telephone, presence: true, numericality: true, :length => { minimum: 11, maximum: 16}


    has_one :user_payment_method
    has_one :user_address
    has_many :shopping_sessions
    # has_many :reported_problems
    has_many :watch_lists
    has_many :watch_list_toys, through: :watch_lists, source: :toy
    # has_many :problem_toys, through: :reported_problems, source: :toy

end
