import Search from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'

export function SearchForm({ handleSubmit, message, inputName }) {
  return (
    <FormControl
      style={{
        width: '90%',
        margin: '1rem auto',
        padding: '1rem',
        textAlign: 'center',
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <FormGroup style={{ margin: 'auto' }}>
        <FormLabel htmlFor={inputName}>{message}</FormLabel>
        <Input
          style={{ marginBottom: '2rem' }}
          fullWidth
          required
          minLength={8}
          type="text"
          name={inputName}
          id={inputName}
        />
        <Button type="submit" variant="contained" startIcon={<Search />}>
          SEARCH
        </Button>
      </FormGroup>
    </FormControl>
  )
}
