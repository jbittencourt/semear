class CreateMaps < ActiveRecord::Migration
  def self.up
    create_table :maps do |t|
      t.string :question, :null=>false
      t.binary :data
      t.integer :editor_id
      t.timestamps
    end
    
    create_table :concepts_maps, :id=>false do |t|
      t.integer :concept_id, :map_id
    end
    
  end

  def self.down
    drop_table :maps
  end
end
