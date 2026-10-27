import os
import base64
import mimetypes
import re
import urllib.parse

# Streamlit App for Brillitos Línea Capilar
try:
    import streamlit as st
    import streamlit.components.v1 as components
except ImportError:
    st = None

def get_base64_data_uri(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        ext = os.path.splitext(file_path)[1].lower()
        if ext in ['.png', '.png']:
            mime_type = 'image/png'
        elif ext in ['.jpg', '.jpeg']:
            mime_type = 'image/jpeg'
        elif ext == '.pdf':
            mime_type = 'application/pdf'
        else:
            mime_type = 'application/octet-stream'

    with open(file_path, 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
    return f"data:{mime_type};base64,{encoded}"

def build_standalone_html():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_path = os.path.join(base_dir, 'index.html')
    css_path = os.path.join(base_dir, 'styles.css')
    js_path = os.path.join(base_dir, 'app.js')
    archivos_dir = os.path.join(base_dir, 'Archivos')

    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Read and embed CSS
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()
        html = re.sub(
            r'<link\s+rel=["\']stylesheet["\']\s+href=["\']styles\.css["\']\s*\/?>',
            f'<style>\n{css}\n</style>',
            html
        )

    # Read and embed JS
    if os.path.exists(js_path):
        with open(js_path, 'r', encoding='utf-8') as f:
            js = f.read()
        html = re.sub(
            r'<script\s+src=["\']app\.js["\']\s*><\/script>',
            f'<script>\n{js}\n</script>',
            html
        )

    # Convert all Archivos into base64 Data URIs
    if os.path.exists(archivos_dir):
        for fname in os.listdir(archivos_dir):
            file_full_path = os.path.join(archivos_dir, fname)
            if os.path.isfile(file_full_path):
                data_uri = get_base64_data_uri(file_full_path)
                
                # Replace exact path and URL-encoded path in HTML & JS
                quoted_fname = urllib.parse.quote(fname)
                variants = [
                    f"Archivos/{fname}",
                    f"Archivos/{quoted_fname}",
                    f"Archivos/{fname.replace(' ', '%20')}",
                    f"/Archivos/{fname}",
                    f"/Archivos/{quoted_fname}",
                    f"/Archivos/{fname.replace(' ', '%20')}"
                ]
                for v in set(variants):
                    html = html.replace(v, data_uri)

    return html

def main():
    if st is None:
        print("Streamlit no está instalado. Ejecuta: pip install streamlit")
        return

    st.set_page_config(
        page_title="Brillitos — Línea Capilar",
        page_icon="✨",
        layout="wide",
        initial_sidebar_state="collapsed"
    )

    # Streamlit layout styling to remove borders and padding
    st.markdown("""
        <style>
            #MainMenu {visibility: hidden;}
            header {visibility: hidden;}
            footer {visibility: hidden;}
            div[data-testid="stToolbar"] {visibility: hidden; display: none;}
            .block-container {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                max-width: 100% !important;
            }
            iframe {
                width: 100% !important;
                border: none !important;
                min-height: 100vh !important;
            }
        </style>
    """, unsafe_allow_html=True)

    # Render complete standalone interactive app
    full_html = build_standalone_html()
    components.html(full_html, height=3800, scrolling=True)

if __name__ == '__main__':
    main()
