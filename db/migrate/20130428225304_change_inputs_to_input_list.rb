class ChangeInputsToInputList < ActiveRecord::Migration
  def change
    rename_column :tools, :inputs, :input_list
  end
end
