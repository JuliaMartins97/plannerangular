import { EventosService } from 'src/app/eventos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-eventos-form',
  templateUrl: './eventos-form.component.html',
  styleUrls: ['./eventos-form.component.css']
})
export class EventosFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: EventosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { }



  ngOnInit() {


    const evento = this.route.snapshot.data['evento'];

    this.form = this.fb.group({
      id: [evento.id],
      nomeevento: [evento.nomeevento, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      data: [evento.data, [Validators.required]],
      hora: [evento.hora, [Validators.required]],
      local: [evento.local, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });

    //  this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //  switchMap(id => this.service.loadByID(id))
    //  )
    // .subscribe(evento => this.updateForm(evento));



  }

  // updateForm(evento: any) {
  //   this.form.patchValue({
  //     id: evento,
  //     nomeevento: evento.nomeevento
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)!.errors;
  }

  OnSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Evento criado com sucesso!';
      let msgError = 'Erro ao criar evento, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Evento atualizado com sucesso!';
        msgError = 'Erro ao atualizar evento, tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );

      /*if (this.form.value.id) {
        //update
        this.service.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Evento atualizado com sucesso!');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao atualizar evento, tente novamente'),
          () => console.log('update completo')
        );
      }else{
        this.service.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Evento criado com sucesso!');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao criar evento, tente novamente'),
          () => console.log('request completo')
        );
      }*/
    }

  }


  OnCancel() {
    this.submitted = false;
    this.form.reset();
  }

}
