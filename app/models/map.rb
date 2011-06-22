# This Model represents an entire map that is draw in semear.
# Differently from tradicional Concept Maps that start with a title, the main identification of this map is a question. Inside data
# it is stored the json that actually represents the map geometry. Although, the database keeps the seeds that are used inside the map
# making easier to the system to analyse maps that are similar to each other.
#
# Author::    Juliano Bittencourt  (mailto:juliano@lec.ufrgs.br)
# License::   Distributes under the same terms as Ruby

class Map < ActiveRecord::Base
  version_fu
  
  #seeds that are present in this map
  has_and_belongs_to_many :seeds
  
  #users that are editing the map
  has_and_belongs_to_many :users
  
  #maps needs to have a question
  validates_presence_of :question
  
  def create_new_version?
    question_changed? && data_changed?
  end
  
end
