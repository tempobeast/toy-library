class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true, on: :create
    validates :password, presence: true, on: :create
    #validates :email is real
    #validates :telephone is 10 digits
    #validates names are all letters
    

    has_one :user_payment_method
    has_one :user_address
    has_one :shopping_session
    has_many :orders
    has_many :order_items, through: :orders
    has_many :reported_problems
    has_many :watch_lists
    has_many :watch_list_toys, through: :watch_lists, source: :toy
    has_many :problem_toys, through: :reported_problems, source: :toy

end
