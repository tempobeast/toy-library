class AddImageToToys < ActiveRecord::Migration[7.0]
  def change
    add_column :toys, :img_url, :string
  end
end
