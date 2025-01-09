export async function renderLoading()
{
	let html = await fetch("pages/Loading.html");
	let htmlText = html.text();
	return (htmlText);
}