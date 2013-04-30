class RemoveInputListFromTools < ActiveRecord::Migration
  def change
    remove_column :tools, :input_list
  end
end
