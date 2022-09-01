class ChangeTelephoneTypeToString < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :telephone, :string
  end
end
