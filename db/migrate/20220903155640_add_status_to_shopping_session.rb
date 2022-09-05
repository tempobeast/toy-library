class AddStatusToShoppingSession < ActiveRecord::Migration[7.0]
  def change
    add_column :shopping_sessions, :status, :string
  end
end
