class CreateUserAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :user_addresses do |t|
      t.integer :user_id
      t.string :street
      t.string :city
      t.string :state
      t.integer :zip

      t.timestamps
    end
  end
end
