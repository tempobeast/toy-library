class CreateShoppingSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :shopping_sessions do |t|
      t.integer :user_id
      t.integer :total

      t.timestamps
    end
  end
end
