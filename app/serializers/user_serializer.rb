class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :telephone

  has_one :shopping_session
  has_many :watch_lists
end
