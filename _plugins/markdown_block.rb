require "kramdown"

module Jekyll
  class MarkdownBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
    end
    def render(context)
      content = super.strip
      "#{Kramdown::Document.new(content).to_html}"
    end
  end
end

Liquid::Template.register_tag('markdown', Jekyll::MarkdownBlock)
