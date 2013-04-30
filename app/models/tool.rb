require 'pp'

class Tool < ActiveRecord::Base
  attr_accessible :code, :name

  validates_presence_of :name

  def execute(args=nil)
    path = Rails.root.join('public', 'sage', 'exec.sage')

    File.open(path, 'w') do |file|
      file << filtered_code(args)
    end

    @result = `sage #{path} 2>&1`
  end

  def inputs
    match = self.code.scan /^%input ([\w\d]*)/
    match.map {|x| x[0]}
  end

  def filtered_code(args=nil)
    result = ''

    self.code.each_line do |line|
      if m = line.match(/^%input ([\w\d]*)/)
        var_name = m[1]

        if args.include?(var_name) and args[var_name] != ''
          result << "#{var_name} = #{args[var_name]}\n"
        else
          result << "#{var_name} = var('#{var_name}')\n"
        end
      else
        result << line
      end
    end

    result
  end

end
