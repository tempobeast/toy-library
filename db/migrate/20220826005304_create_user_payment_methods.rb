class CreateUserPaymentMethods < ActiveRecord::Migration[7.0]
  def change
    create_table :user_payment_methods do |t|
      t.integer :user_id
      t.string :payment_type
      t.string :provider
      t.integer :account_no
      t.integer :expiration
      t.integer :code

      t.timestamps
    end
  end
end
