class UserPaymentMethodSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :payment_type, :provider, :account_no, :expiration, :code
end
