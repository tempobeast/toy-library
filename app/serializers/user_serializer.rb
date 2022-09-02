class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :first_name, :last_name, :email, :telephone

  has_one :shopping_session
  has_many :watch_list_toys
end
