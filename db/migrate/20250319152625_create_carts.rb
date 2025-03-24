class CreateCarts < ActiveRecord::Migration[7.0]
  def change
    create_table :carts do |t|
      t.integer :user_id
      t.integer :total
      t.string :status
      t.string :type

      t.timestamps
    end
  end
end
