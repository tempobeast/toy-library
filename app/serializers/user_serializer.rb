class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :telephone, :shopping_sessions

  has_many :shopping_sessions
  has_many :watch_lists
  has_one :user_address
end
