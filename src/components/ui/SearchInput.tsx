type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function SearchInput({ value, onChange, placeholder = 'Search…' }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-border bg-surface rounded-sm px-3 py-2 text-sm text-ink outline-none focus:border-border-strong"
    />
  )
}

export default SearchInput
