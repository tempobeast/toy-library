class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.integer :shopping_session_id
      t.integer :toy_id
      t.integer :quantity

      t.timestamps
    end
  end
end
