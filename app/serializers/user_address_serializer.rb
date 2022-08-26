class UserAddressSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :street, :city, :state, :zip
end
