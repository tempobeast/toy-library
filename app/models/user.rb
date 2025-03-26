class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true, on: :create
    validates :password, presence: true, :length => { minimum: 8, maximum: 16}, on: :create
    validates :email, presence: true, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
    validates :first_name, presence: true, format: { with: /\A[^0-9`!@#\$%\^&*+_=]+\z/, message: "only allows letters" }
    validates :last_name, presence: true, format: { with: /\A[^0-9`!@#\$%\^&*+_=]+\z/, message: "only allows letters" }

    # validates :telephone, presence: true, numericality: true, :length => { minimum: 11, maximum: 16}

    def create_first_admin 
        if self == User.first
            self.update(is_admin: true)
        end
    end

    has_many :poly_reviews, as: :reviewable
    has_one :user_address
    has_many :previous_orders
    has_many :shopping_sessions
    has_many :watch_lists
    has_many :watch_list_toys, through: :watch_lists, source: :toy

end
