import Search from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Loader } from './Loader'

export function SearchForm({ handleSubmit, message, inputName, loading }) {
  return (
    <FormControl
      style={{
        width: '100%',
        maxWidth: '600px',
        alignItem: 'center',
        padding: 'auto 1rem',
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <FormGroup
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '0',
          flexWrap: 'nowrap',
          justifyContent: 'center',
        }}
      >
        <TextField
          style={{ flexGrow: 1 }}
          required
          minLength={8}
          type="text"
          name={inputName}
          id={inputName}
          placeholder={message}
          variant="outlined"
        />

        <Button
          disabled={loading}
          style={{ borderRadius: '0 5px 5px 0', width: '50px' }}
          type="submit"
          variant="contained"
        >
          <Search />
        </Button>
      </FormGroup>
    </FormControl>
  )
}
