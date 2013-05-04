require 'securerandom'

class SageRunner
  attr_accessor :code, :vars, :result

  def initialize(code)
    @code = code
    @vars = vars
  end

  def execute(args)
    sage_path = Rails.root.join('public', 'sage', "exec_#{SecureRandom.uuid}.sage")

    File.open(sage_path, 'w') do |file|
      file << filtered_code(args)
    end

    @result = `sage #{sage_path} 2>&1`

    File.delete(sage_path) if File.exist?(sage_path)
    py_path = "#{sage_path.to_s.chomp!(File.extname(sage_path))}.py"
    File.delete(py_path) if File.exist?(py_path)

    @result
  end

  def filtered_code(args=nil)
    result = ''

    self.code.each_line do |line|
      line.chomp!
      if m = line.match(/^%input ([\w\d]*)/)
        var_name = m[1]

        if args.include?(var_name) and args[var_name] != ''
          result << "#{var_name} = #{args[var_name]}\n"
        else
          result << "#{var_name} = var('#{var_name}')\n"
        end
      else
        result << "#{line}\n"
      end
    end

    result
  end

end