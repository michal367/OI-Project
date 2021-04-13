import { importQuestions } from "../../services/FileService"
import  Button  from '@material-ui/core/Button';
export function QuestionsListView(){

    const onChange = (event:any) => {
        var files = event.target.files;
        var json;
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                    return function (e:any) {
                        try {
                            json = JSON.parse(e.target.result);
                            console.log(importQuestions(JSON.stringify(json))[0].text); // test
                        } catch (ex) {
                            alert(ex);
                        }
                    }
                })(f);
                reader.readAsText(f);
            }
    }


    return(
        <div>
            <Button variant="contained" component="label">
                Import<input type="file" hidden onChange={(e) => onChange(e)}/>
            </Button>

            <Button variant="contained" component="label">
                Export
            </Button>
        </div>
    );
}