require 'pp'

class Tool < ActiveRecord::Base
  attr_accessible :code, :name

  validates_presence_of :name

  def execute(args=nil)
    runner = SageRunner.new(self.code)
    runner.execute(args)
  end

  def inputs
    match = self.code.scan /^%input ([\w\d]*)/
    match.map {|x| x[0]}
  end
end
