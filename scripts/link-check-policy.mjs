export function shouldReplaceLinkRegistry(results){
  return results.length>0&&results.some(result=>result.status!==null);
}
