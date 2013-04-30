class AddInputsToTool < ActiveRecord::Migration
  def change
    add_column :tools, :inputs, :string
  end
end
