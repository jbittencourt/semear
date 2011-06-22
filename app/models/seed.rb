# This Model represents a concept inside the Concepts Maps.
# Although, inside SEMEAR a concept is named seed, as a short
# for Seed Word.
#
# The seed hold just a few information, like its color and a representing image.
# All other relations to resources is done through resources plugins.
#
# Author::    Juliano Bittencourt  (mailto:juliano@lec.ufrgs.br)
# License::   Distributes under the same terms as Ruby
class Seed < ActiveRecord::Base
  
  belongs_to :user
  
  validates_presence_of :word
  

end
