# The user uploaded a Jupyter Notebook file and requested to convert it to a .py file.
# I'll load the file, extract the code, and save it as a .py file.

import nbformat

# Load the Jupyter notebook
file_path = '/mnt/data/KNN_BT1-practice.ipynb'
with open(file_path, 'r', encoding='utf-8') as f:
    notebook = nbformat.read(f, as_version=4)

# Extract code cells
code_cells = [cell['source'] for cell in notebook.cells if cell.cell_type == 'code']

# Combine code into a single script
py_content = "\n\n".join(code_cells)

# Save the extracted code into a .py file
output_path = '/mnt/data/KNN_BT1-practice.py'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(py_content)

