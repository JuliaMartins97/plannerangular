import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subject, empty } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EventosService } from 'src/app/eventos.service';
import { Evento } from '../evento';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.css']
})
export class EventosListaComponent implements OnInit {

  // bsModalRef: BsModalRef | undefined;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  eventos$: Observable<Evento[]> | undefined;
  error$ = new Subject<boolean>();

  eventoSelecionado: Evento;

  constructor(private service: EventosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    this.onRefresh();
  }

  onRefresh(): any {

    this.eventos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.log(error);
          this.handleError();
          // tslint:disable-next-line: deprecation
          return empty();

        })
      );

    // tslint:disable-next-line: align
    this.service.list()
      .pipe(
        // tslint:disable-next-line: deprecation
        catchError(error => empty())
      )
      // tslint:disable-next-line: deprecation
      .subscribe(
        dados => {
          console.log(dados);
        }

      );
  }

  // tslint:disable-next-line: typedef
  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar eventos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar eventos. Tente novamente mais tarde.';

  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
  onDelete(evento) {
    this.eventoSelecionado = evento;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.service.remove(this.eventoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Ops...Erro ao remover evento. Tente mais tarde.');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
